import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "./models/userModel";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import Offer from "./models/offerModel";

console.log("test!");

const app = express();
const port = 5000;

connectDB();

app.use(cors());

app.get("/", (_, res) => {
  res.status(200).send();
});

app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));

// Handle register
app.post(
  "/api/register",
  [
    check("password")
      .trim()
      .notEmpty()
      .withMessage("Prosze podać hasło")
      .isLength({ min: 8 })
      .withMessage("Hasło musi mieć min 8 znaków")
      .matches(/(?=.*?[A-Z])/)
      .withMessage("Hasło musi mieć przynajmniej jeden duzy znak")
      .matches(/(?=.*?[a-z])/)
      .withMessage("Hasło musi mieć przynajmniej jeden mały znak")
      .matches(/(?=.*?[0-9])/)
      .withMessage("Hasło musi mieć przynajmniej jeden numer")
      .not()
      .matches(/^$|\s+/)
      .withMessage("Znaki biały są niedozwolone"),
    check("mail")
      .isEmail()
      .escape()
      .trim()
      .normalizeEmail()
      .withMessage("Zły mail"),
    check("name").trim().escape(),
  ],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ ok: false, errors: errors.array() });
    }

    try {
      const newPassword = await bcrypt.hash(req.body.password, 10);

      await User.create({
        name: req.body.name,
        email: req.body.mail,
        password: newPassword,
        theme: "light",
        points: 100,
        offersPosted: [],
      });

      res.json({ ok: true });
    } catch (err) {
      console.log(err);
      res.json({ ok: false, errors: [{ msg: "Posiadasz już konto!" }] });
    }
  }
);

// Handle login
app.post(
  "/api/login",
  [
    check("password").trim().escape(),
    check("mail").isEmail().trim().escape().normalizeEmail(),
  ],
  async (req: express.Request, res: express.Response) => {
    console.log(req.body);

    const user = await User.findOne({
      email: req.body.mail,
    });

    if (!user) {
      return res.json({ ok: false, error: "Taki użytkownik nie istnieje" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isPasswordValid && process.env.JWT_SECRET) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET
      );

      return res.json({
        ok: true,
        user: {
          token: token,
          name: user.name,
          mail: user.email,
          subjects: user.subjects,
          studied: user.studied,
          taught: user.taught,
          profileImage: user.profileImage,
          theme: user.theme,
          points: user.points,
          offersPosted: user.offersPosted,
        },
      });
    } else {
      return res.json({
        ok: false,
        user: false,
        error: "Mail lub hasło się nie zgadzają",
      });
    }
  }
);

app.post(
  "/api/getData",
  [check("mail").isEmail().trim().escape().normalizeEmail()],
  async (req: express.Request, res: express.Response) => {
    const user = await User.findOne({
      email: req.body.mail,
    });

    if (!user) {
      return res.json({ ok: false, error: "Taki użytkownik nie istnieje" });
    }

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET
    );

    return res.json({
      ok: true,
      user: {
        token: token,
        name: user.name,
        mail: user.email,
        subjects: user.subjects,
        studied: user.studied,
        taught: user.taught,
        profileImage: user.profileImage,
        theme: user.theme,
        points: user.points,
        offersPosted: user.offersPosted,
      },
    });
  }
);

// Handle post offer
app.post(
  "/api/postoffer",
  [
    check("title").trim().escape(),
    check("subject").trim().escape(),
    check("info").trim().escape(),
    check("price").trim().escape(),
    check("mail").trim().escape(),
  ],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ ok: false, errors: errors.array() });
    }

    try {
      await Offer.create({
        title: req.body.title,
        subject: req.body.subject,
        info: req.body.info,
        price: req.body.price,
        email: req.body.email,
        dates: req.body.dates,
      });

      res.json({ ok: true });
    } catch (err) {
      console.log(err);
      res.json({
        ok: false,
        errors: [{ msg: "Utworzenie oferty się nie udało!" }],
      });
    }
  }
);

// Handle get theme from database
app.post(
  "/api/getTheme",
  [check("mail").isEmail().trim().escape().normalizeEmail()],
  async (req: express.Request, res: express.Response) => {
    const user = await User.findOne({
      email: req.body.mail,
    });

    if (!user) {
      return res.json({ ok: false, error: "Błąd pobierania motywu" });
    }

    return res.json({
      ok: true,
      theme: user.theme,
    });
  }
);

// Handle updating theme in the database
app.put(
  "/api/updatetheme",
  [check("theme")],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ ok: false, errors: errors.array() });
    }

    try {
      const filter = { email: req.body.email };
      const update = { theme: req.body.theme };

      await User.findOneAndUpdate(filter, update);

      res.json({ ok: true });
    } catch (err) {
      console.log(err);
      res.json({
        ok: false,
        errors: [{ msg: "Zmiana motywu się nie powiodła!" }],
      });
    }
  }
);

app.post(
  "/api/editProfile",
  [
    check("mail").isEmail().trim().escape().normalizeEmail(),
    check("username").trim().escape(),
  ],
  async (req: express.Request, res: express.Response) => {
    const user = await User.findOne({
      email: req.body.mail,
    });

    if (!user) {
      return res.json({ ok: false, error: "Nie znaleziono." });
    }

    try {
      await User.updateOne(
        { email: user.email },
        {
          name: req.body.username,
          subjects: req.body.subjects,
        }
      );
    } catch (err) {
      return res.json({ ok: false, error: "Wystąpił błąd" });
    }

    return res.json({
      ok: true,
    });
  }
);

// Handle get subjects from database
app.post(
  "/api/getSubjects",
  [check("mail").isEmail().trim().escape().normalizeEmail()],
  async (req: express.Request, res: express.Response) => {
    const user = await User.findOne({
      email: req.body.mail,
    });

    if (!user) {
      return res.json({ ok: false, error: "Błąd pobierania przedmiotów" });
    }

    return res.json({
      ok: true,
      subjects: user.subjects,
    });
  }
);

// Handle get featured offers for user from database
app.post(
  "/api/getChosenOffers",
  [check("subject"), check("mail")],
  async (req: express.Request, res: express.Response) => {
    Offer.aggregate([
      {
        $lookup: {
          from: "user",
          localField: "email",
          foreignField: "email",
          as: "authorName",
        },
      },
    ])
      .then(async (data) => {
        let offers: any[] = [];

        data.forEach((el) => {
          if (
            el.subject.toLowerCase() == req.body.subject.toLowerCase() &&
            el.email !== req.body.mail
          ) {
            offers.push(el);
          }
        });

        return res.json({
          ok: true,
          offers: offers,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

// Handle get points from database
app.post(
  "/api/getPoints",
  [check("mail").isEmail().trim().escape().normalizeEmail()],
  async (req: express.Request, res: express.Response) => {
    const user = await User.findOne({
      email: req.body.mail,
    });

    if (!user) {
      return res.json({ ok: false, error: "Błąd pobierania punktów" });
    }

    return res.json({
      ok: true,
      points: user.points,
    });
  }
);

app.put(
  "/api/updatePoints",
  [check("email").isEmail().trim().escape().normalizeEmail()],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ ok: false, errors: errors.array() });
    }

    try {
      const filter = { email: req.body.email };
      const update = { points: req.body.points };

      await User.findOneAndUpdate(filter, update);

      res.json({ ok: true });
    } catch (err) {
      console.log(err);
      res.json({
        ok: false,
        errors: [{ msg: "Aktualizacja punktów się nie powiodła" }],
      });
    }
  }
);

app.post(
  "/api/getUserOffers",
  [check("mail").isEmail().trim().escape().normalizeEmail()],
  async (req: express.Request, res: express.Response) => {
    console.log(req.body.mail);

    const offers = await Offer.find({
      email: req.body.mail,
    });

    if (!offers) {
      return res.json({ ok: false, error: "Błąd pobierania ofert" });
    }

    return res.json({
      ok: true,
      data: offers,
    });
  }
);

app.post(
  "/api/sendOfferRequest",
  [
    check("mail").isEmail().trim().escape().normalizeEmail(),
    check("date").trim().escape(),
    check("id").trim().escape(),
  ],
  async (req: express.Request, res: express.Response) => {
    const offers = await Offer.updateOne(
      { _id: req.body.id },
      {
        $addToSet: {
          acceptedBy: {
            teacher: req.body.mail,
            date: req.body.date,
          },
        },
      }
    );

    if (!offers) {
      return res.json({ ok: false, error: "Błąd pobierania ofert" });
    }

    return res.json({
      ok: true,
      data: offers,
    });
  }
);

app.post(
  "/api/planLesson",
  [
    check("teacherMail").isEmail().trim().escape().normalizeEmail(),
    check("date").trim().escape(),
    check("studentMail").trim().escape(),
    check("offerId").trim().escape(),
    check("lessonUrl").trim().escape(),
  ],
  async (req: express.Request, res: express.Response) => {
    const student = await User.updateOne(
      {
        email: req.body.studentMail,
      },
      {
        $addToSet: {
          plannedLessons: {
            date: req.body.date,
            teacherMail: req.body.teacherMail,
            studentMail: req.body.studentMail,
            lessonUrl: req.body.lessonUrl,
          },
        },
      }
    );

    const teacher = await User.updateOne(
      {
        email: req.body.teacherMail,
      },
      {
        $addToSet: {
          plannedLessons: {
            date: req.body.date,
            teacherMail: req.body.teacherMail,
            studentMail: req.body.studentMail,
            lessonUrl: req.body.lessonUrl,
          },
        },
      }
    );

    const offers = await Offer.deleteOne({
      _id: req.body.offerId,
    });

    console.log(offers);

    if (!teacher || !student || !offers) {
      return res.json({ ok: false, error: "Błąd" });
    }

    return res.json({
      ok: true,
    });
  }
);

app.post(
  "/api/getLessons",
  [check("mail").isEmail().trim().escape().normalizeEmail()],
  async (req: express.Request, res: express.Response) => {
    const user = await User.find({
      email: req.body.mail,
    });

    if (!user) {
      return res.json({ ok: false, error: "Błąd pobierania lekcji" });
    }

    return res.json({
      ok: true,
      data: user,
    });
  }
);

app.listen(port, () => console.log(`Running on port http://localhost:${port}`));
