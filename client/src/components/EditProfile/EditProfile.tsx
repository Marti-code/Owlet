import React, { RefObject, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API, { UserInfoType } from "../../API";
import ProfileHeader from "../Profile/ProfileHeader";
import "../TeacherModal/RadioBtns.css";
import {
  ButtonContainer,
  Form,
  FormInfo,
  FormWrapper,
  Heading,
  Input,
  Label,
  LanguagesWrapper,
  Loader,
  Select,
  Submit,
} from "../../GlobalForm.styles";

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
  const nameInput: any = useRef();

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
    if (!userData || !userData.subjects) return;

    setCheckedSubjects([]);
    console.log(userData.subjects);
    userData.subjects.forEach((el) => {
      setCheckedSubjects([...checkedSubjects, el]);
    });

    setName(userData.name);
  }, [userData]);

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

    if (name.length < 3) {
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
    <div className={`edit-container ${userData?.theme || "light"}`}>
      <ProfileHeader />
      <FormWrapper>
        <>
          <Form method="post" onSubmit={handleSubmit} autoComplete="off">
            {/* <Heading>Edytuj profil</Heading> */}

            <div>
              <Label>Imię i nazwisko</Label>
              <Input
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="username1"
                placeholder={userData?.name}
                autoComplete="off"
                value={name}
                ref={nameInput}
              />
            </div>

            <div
              onClick={() => {
                setShow(!show);
              }}
            >
              <Label>Przedmioty</Label>
            </div>

            <div className="section over-hide z-bigger">
              <div className="pb-5">
                <div className="row justify-content-center pb-5">
                  <div className="col-12 pb-5">
                    {userData &&
                      subjects.map((el: any, idx: any) => {
                        return (
                          <div className="subject-el" key={idx}>
                            <input
                              className="checkbox-tools"
                              type="checkbox"
                              name="chosenSubject"
                              value={el}
                              id={"tool-" + idx}
                            />
                            <label
                              className="for-checkbox-tools"
                              htmlFor={"tool-" + idx}
                            >
                              {el}
                            </label>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              <FormInfo>{info}</FormInfo>
              {loading ? <Loader /> : null}
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
                          setCheckedSubjects([
                            ...checkedSubjects,
                            e.currentTarget.value,
                          ]);
                        else
                          setCheckedSubjects(
                            checkedSubjects.filter(
                              (el) => el !== e.currentTarget.value
                            )
                          );
                      }}
                    ></input>
                  </label>
                ))}
              </LanguagesWrapper>
            ) : null}

            <ButtonContainer>
              <a href="/dashboard">
                <button type="button">Anuluj</button>
              </a>
              <Submit
                onClick={() => {
                  setTimeout(() => {
                    navigate("/dashboard");
                  }, 1000);
                }}
              >
                Zapisz zmiany
              </Submit>
            </ButtonContainer>
          </Form>
        </>
      </FormWrapper>
    </div>
  );
};

export default EditProfile;
