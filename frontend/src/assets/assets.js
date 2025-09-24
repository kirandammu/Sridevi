import logo from "./logo.svg";
import search_icon from "./search_icon.svg";
import remove_icon from "./remove_icon.svg";
import arrow_right_icon_colored from "./arrow_right_icon_colored.svg";
import star_icon from "./star_icon.svg";
import star_dull_icon from "./star_dull_icon.svg";
import cart_icon from "./cart_icon.svg";
import nav_cart_icon from "./nav_cart_icon.svg";
import add_icon from "./add_icon.svg";
import refresh_icon from "./refresh_icon.svg";
import product_list_icon from "./product_list_icon.svg";
import order_icon from "./order_icon.svg";
import upload_area from "./upload_area.png";
import profile_icon from "./profile_icon.png";
import menu_icon from "./menu_icon.svg";
import delivery_truck_icon from "./delivery_truck_icon.svg";
import leaf_icon from "./leaf_icon.svg";
import coin_icon from "./coin_icon.svg";
import box_icon from "./box_icon.svg";
import trust_icon from "./trust_icon.svg";
import black_arrow_icon from "./black_arrow_icon.svg";
import white_arrow_icon from "./white_arrow_icon.svg";
import add_address_iamge from "./add_address_image.svg";
import jbl_soundbox_image from "./jbl_soundbox_image.png";
import md_controller_image from "./md_controller_image.png";
import contact from './contact_img.png'

import banner2 from './bcd.jpg'
import banner3 from './abc.jpg'
import banner4 from './ab.jpg'

import men from './men.jpg'
import women from './women.jpg'
import boy from './boyy.png'
import girl from './girll.png'
import bigbanner from './bigbanner.jpg'

import shirt from './shirts.jpg'
import saree from './saree.jpg'
import tshirt from './t-shirts.jpg'
import chudidhar from './chudidhar.jpg'
import partywear from './partywear.jpg'
import jeans from './jeans.avif'






export const assets = {
  logo,
  search_icon,
  remove_icon,
  arrow_right_icon_colored,
  star_icon,
  star_dull_icon,
  cart_icon,
  nav_cart_icon,
  add_icon,
  refresh_icon,
  product_list_icon,
  order_icon,
  upload_area,
  profile_icon,
  menu_icon,
  delivery_truck_icon,
  leaf_icon,
  coin_icon,
  trust_icon,
  black_arrow_icon,
  white_arrow_icon,
  add_address_iamge,
  box_icon,
  contact,
  jbl_soundbox_image,
  md_controller_image,
  boy, girl, bigbanner

};

 export const images = [banner2, banner3, banner4]

// export const categories = [
//   {
//     text: "Mobiles",
//     path: "mobiles",
//     image: ba1,
//   },
//   {
//     text: "AirPods",
//     path: "airpods",
//     image: ba2,
//   },
//   {
//     text: "Television",
//     path: "television",
//     image: ba3,
//   },
//   {
//     text: "Watch",
//     path: "watch",
//     image: ba4,
//   },
//   {
//     text: "Speakers",
//     path: "speakers",
//     image: ba5,
//   },
//   {
//     text: "Laptos",
//     path: "laptops",
//     image: ba6,
//   },
//   {
//     text: "Camera",
//     path: "camera",
//     image: ba7,
//   },
//   {text:"EarPhones",
//     path:"earphones",
//     image:ba8
//   }
// ];

export const categoriess = [
  {text:'Men', path:'men', image:men},
  {text:'Women', path:'women', image:women},
  {text:'Boy', path:'boy', image:boy},
  {text:'Girl', path:'girl', image:girl},
  {text:'Interior', path:'other', image:girl},
]

export const subCategoriess = [
  {text:'Shirts', path:'shirts', image:shirt},
  {text:'Sarees', path:'sarees', image:saree},
  {text:'Jeans', path:'jeans', image:jeans},
  {text:'Chudidhars', path:'chudidhars', image:chudidhar}, 
  {text:'T-shirts', path:'t-shirts', image:tshirt}, 
  {text:'PartyWear', path:'partywear', image:partywear}, 
]





export const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { text: "Home", url: "#" },
      { text: "Best Sellers", url: "#" },
      { text: "Offers & Deals", url: "#" },
      { text: "Contact Us", url: "#" },
      { text: "FAQs", url: "#" },
    ],
  },
  {
    title: "Need help?",
    links: [
      { text: "Delivery Information", url: "#" },
      { text: "Return & Refund Policy", url: "#" },
      { text: "Payment Methods", url: "#" },
      { text: "Track your Order", url: "#" },
      { text: "Contact Us", url: "#" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { text: "Instagram", url: "#" },
      { text: "Twitter", url: "#" },
      { text: "Facebook", url: "#" },
      { text: "YouTube", url: "#" },
    ],
  },
];


export const features = [
  {
    icon: delivery_truck_icon,
    title: "Fastest Delivery",
    description: "Groceries delivered in under 30 minutes.",
  },
  {
    icon: leaf_icon,
    title: "Freshness Guaranteed",
    description: "Fresh produce straight from the source.",
  },
  {
    icon: coin_icon,
    title: "Affordable Prices",
    description: "Quality groceries at unbeatable prices.",
  },
  {
    icon: trust_icon,
    title: "Trusted by Thousands",
    description: "Loved by 10,000+ happy customers.",
  },
];


export const dummyAddress = [
  {
    _id: "67b5b9e54ea97f71bbc196a0",
    userId: "67b5880e4d09769c5ca61644",
    firstName: "Great",
    lastName: "Stack",
    email: "user.greatstack@gmail.com",
    street: "Street 123",
    city: "Main City",
    state: "New State",
    zipcode: 123456,
    country: "IN",
    phone: "1234567890",
  },
  {
    _id: "67b5b9e54ea97f71bbc196a0",
    userId: "67b5880e4d09769c5ca61644",
    firstName: "Great",
    lastName: "Stack",
    email: "user.greatstack@gmail.com",
    street: "Thagarapuvalasa",
    city: "Visakhapatnam",
    state: "Andhra pradesh",
    zipcode: 123456,
    country: "IN",
    phone: "1234567890",
  },
];

export const dummyOrders = [
  {
    _id:"",
    userId:''
  }
]
