export type UserInfoType = {
  name: string;
  mail: string;
  token: string;
  profileImage: string;
  subjects: string[];
  studied: number;
  taught: number;
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
};
