export type UserInfoType = {
  name: string;
  mail: string;
  token: string;
  profileImage: string;
  subjects: string[];
  studied: number;
  taught: number;
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
    duration: string
  ) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/postoffer`;

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
        duration: duration,
      }),
    });

    return await res.json();
  },

  putTheme: async (theme: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/updatetheme`;

    const res = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        theme: theme,
      }),
    });

    return await res.json();
  },
};
