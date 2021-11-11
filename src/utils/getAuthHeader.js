const getAuthHeader = (...props) => ({
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
    ...props,
  },
});

export default getAuthHeader;
