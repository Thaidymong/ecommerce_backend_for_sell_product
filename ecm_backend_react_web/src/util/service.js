import dayjs from "dayjs";

export const image_path = "http://localhost/image_path/ecmbackend/";

var language = {
  1: {
    title_category: "Category",
    btn_save: "Save",
    home: "Home",
    category: "Category",
    product: "Product",
    customer: "Customer",
    cart: "Cart",
    order: "Order",
    paymentmethod: "Payment Method",
    orderstatus: "Order Status",
    address: "Address",
    setting: "Setting",
    logout: "Logout",
  },
  2: {
    title_category: "ប្រភេទ",
    btn_save: "រក្សាទុក",
    home: "ទំព័រដើម",
    category: "ប្រភេទ",
    product: "ទំនិញ",
    customer: "អតិថិជន",
    cart: "រទេះ",
    order: "កម្មង់",
    paymentmethod: "ការបង់ប្រាក់",
    orderstatus: "បញ្ជាក់ការកម្មង់់",
    address: "អាស័យដ្ឋាន",
    setting: "ការកំណត់",
    logout: "ចាកចេញ",
  },
};
// export const getText = (language_id,keyword)=>{
//     return language[language_id][keyword]
// }

export const getText = (keyword, default_text) => {
  const language_id = localStorage.getItem("language_id") || 1;
  return language[language_id][keyword]
    ? language[language_id][keyword]
    : default_text;
};

export const dayForClient = (date) => {
  if (date != null) {
    return dayjs(date).format("DD/MM/YYYY");
  }
  return null;
};

export const dayForServer = (date) => {
  if (date != null) {
    return dayjs(date).format("YYYY/MM/DD");
  }
  return null;
};
