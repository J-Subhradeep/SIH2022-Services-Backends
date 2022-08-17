const string = "dev_stuff/akdfladf";

const checkResType = (file) => {
  const [one, two] = ["image", "video"].map((unit) => file != unit);
  return one == two;
};

const [res_type, p_id] = string.split("&");
console.log(res_type, p_id);

if (checkResType(res_type) || p_id == "") {
  return console.log("Invalid file type or public id");
} 
console.log("All right");
