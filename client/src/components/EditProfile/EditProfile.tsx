import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import API, { UserInfoType } from '../../API';
import { Form, FormWrapper, Heading, Input, Loader, Submit } from './EditProfile.styles';


type Props = {
  isLoggedIn: boolean;
  loading: boolean;
  userData: UserInfoType | undefined;
  getData: any;
}

const EditProfile: React.FC<Props> = ({isLoggedIn, userData, loading, getData}) => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [img, setImage] = useState('');

  const handleSubmit = async() => {

  }

  useEffect(() => {
    getData();
  }, [])

  if (loading)
    return <>Loading...</>

  return (
    <div className='container'>
      <FormWrapper>
        <>
        <Heading>Edytuj profil</Heading>

        <Form method="post" onSubmit={handleSubmit}>
          <p>
            <Input
              onChange={(e) => setName(e.target.value)}
              value={mail}
              type="text"
              name="name"
              placeholder={userData?.name}
              required
              autoComplete='off'
            />
          </p>  
      
          <p>
            <Input
              onChange={(e) => setMail(e.target.value)}
              type="mail"
              name="mail"
              placeholder={userData?.mail}
              required
            />
          </p>

          <Submit>Zapisz zmiany</Submit>
        </Form>
        {loading ? <Loader /> : null}
        </>
      </FormWrapper>
    </div>
  )
}

export default EditProfile