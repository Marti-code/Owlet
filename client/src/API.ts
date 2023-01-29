export type UserInfoType = {
  name: string;
  mail: string;
  token: string;
  profileImage: string;
  subjects: string[];
  studied: number;
  taught: number;
  points: number;
  theme: string;
};

export default {
  signUpFetch: async (name: string, mail: string, password: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/register`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        mail: mail,
        password: password,
        theme: "light",
      }),
    });

    return await res.json();
  },

  signInFetch: async (mail: string, password: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/login`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        mail: mail,
        password: password,
      }),
    });

    return await res.json();
  },

  getUserDataFetch: async (mail: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/getData`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        mail: mail,
      }),
    });

    return await res.json();
  },

  getUserThemeFetch: async (mail: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/getTheme`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        mail: mail,
      }),
    });

    return await res.json();
  },

  postOfferFetch: async (
    title: string,
    subject: string,
    info: string,
    price: string,
    email: string,
    dates: string[],
    hours: string[]
  ) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/postoffer`;

    const fullDates = [];

    for (let i = 0; i < hours.length; i++) {
      fullDates[i] = hours[i] + ";" + dates[i];
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        subject: subject,
        info: info || "none",
        price: price,
        email: email,
        dates: fullDates,
      }),
    });

    return await res.json();
  },

  putTheme: async (theme: string, email: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/updatetheme`;

    const res = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        theme: theme,
      }),
    });

    return await res.json();
  },

  editProfile: async (username: string, subjects: string[] ,email: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/editProfile`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        mail: email,
        username: username,
        subjects: subjects
      }),
    });

    return await res.json();
  },

  //getting users subjects depending on their email
  getSubjects: async (mail: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/getSubjects`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        mail: mail,
      }),
    });

    return await res.json();
  },

  //getting featured offers for user
  getChosenOffers: async (subject: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/getChosenOffers`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        subject: subject,
      }),
    });

    return await res.json();
  },

  getPoints: async (mail: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/getPoints`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        mail: mail,
      }),
    });

    return await res.json();
  },

  updatePoints: async (points: number, email: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/updatePoints`;

    const res = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        points: points,
      }),
    });

    return await res.json();
  },
  getUserOffers: async (email: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/getUserOffers`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        mail: email,
      })
    });

    return await res.json();
  },
  sendOfferRequest: async (mail: string, date: string, id: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/sendOfferRequest`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        mail: mail,
        date: date,
        id: id
      })
    });

    return await res.json();
  },
};
