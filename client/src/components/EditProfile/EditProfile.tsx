import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API, { UserInfoType } from "../../API";
import {
  Form,
  FormWrapper,
  Heading,
  Input,
  LanguagesWrapper,
  Loader,
  Select,
  Submit,
} from "./EditProfile.styles";

type Props = {
  isLoggedIn: boolean;
  loading: boolean;
  userData: UserInfoType | undefined;
  getData: any;
};

const EditProfile: React.FC<Props> = ({
  isLoggedIn,
  userData,
  loading,
  getData,
}) => {
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [img, setImage] = useState("");
  const [info, setInfo] = useState("");
  const [subjects, setSubjects] = useState([
    "matematyka",
    "fizyka",
    "polski",
    "angielski",
    "biologia",
    "chemia",
    "niemiecki",
  ]);
  const [checkedSubjects, setCheckedSubjects] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    // console.log("islogged in edit page: " + isLoggedIn)

    if (!isLoggedIn) {
      console.log(isLoggedIn);
      navigate("/sign-in");
    }
    // getData();
  }, [isLoggedIn]);

  useEffect(() => {
    if (!userData || !userData.subjects)
      return;

    setCheckedSubjects([]);
    console.log(userData.subjects);
    userData.subjects.forEach((el) => {
      setCheckedSubjects([...checkedSubjects, el]);
    })
  }, [userData])

  // useEffect(() => {
  //   console.log(checkedSubjects);
  // }, [checkedSubjects])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (1) {
    //   console.log(checkedSubjects)
    //   return;
    // }

    if (!userData || !userData.mail) return;

    if (name == "" || name.length < 3) {
      setInfo("Nazwa powinna mieć przynajmniej 3 znaki");
      return;
    }

    const data = await API.editProfile(name, checkedSubjects, userData?.mail);
    console.log(data);

    if (data.ok) {
      setInfo("Zapisano zmiany!");
      getData();
    } else {
      setInfo("Nie zapisano zmian.");
    }
  };

  if (loading) return <>Loading...</>;

  return (
    <div className="container">
      <FormWrapper>
        <>
          <Heading>Edytuj profil</Heading>

          <Form method="post" onSubmit={handleSubmit} autoComplete="off">
            <p>
              <Input
                onChange={(e) => setName(e.target.value)}
                value={userData?.name}
                type="text"
                name="username"
                placeholder={userData?.name}
                required
              />
            </p>

            <div
              onClick={() => {
                setShow(!show);
              }}
            >
              Wybierz przedmioty
            </div>

            {userData ? (
              <LanguagesWrapper show={show}>
                {subjects.map((el) => (
                  <label key={el}>
                    {el}
                    <input
                      type="checkbox"
                      value={el}
                      defaultChecked={
                        userData?.subjects.find((e) => e == el) ? true : false
                      }
                      onClick={(e) => {
                        if (e.currentTarget.checked)
                          setCheckedSubjects([...checkedSubjects, e.currentTarget.value]);
                        else 
                          setCheckedSubjects(checkedSubjects.filter((el) => el !== e.currentTarget.value));
                      }}
                    ></input>
                  </label>
                ))}
              </LanguagesWrapper>
            ) : null}

            <Submit>Zapisz zmiany</Submit>
          </Form>
          {info}
          {loading ? <Loader /> : null}
        </>

        <button>
          <Link to="/dashboard">Powrót</Link>
        </button>
      </FormWrapper>
    </div>
  );
};

export default EditProfile;
