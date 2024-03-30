import Navbar from "../component/Navbar";
import NavbarV2 from "../component/NavbarV2";
import imageIsmail from "../assets/ismail.jpg"
import profileKosong from "../assets/profile.jpg"
import { Card, CardBody, Avatar, Typography } from "@material-tailwind/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function TeamCard({ img, name, title, gitHub, instagram, linkedLn }) {
  return (
    <Card className="rounded-lg bg-[#FAFAFA]" shadow={false}>
      <CardBody className="text-center">
        <Avatar
          src={img}
          alt={name}
          variant="circular"
          className="mx-auto mb-6 object-top w-80 h-60"
        />
        <Typography
          variant="h5"
          color="blue-gray"
          className="!font-medium text-lg"
        >
          {name}
        </Typography>
        <Typography
          color="blue-gray"
          className="mb-2 !text-base !font-semibold text-gray-600"
        >
          {title}
        </Typography>
        <div className="flex items-center justify-center gap-[30px] py-1 text-2xl">
          <a href={gitHub} target="_blank">
            <FontAwesomeIcon icon={faGithub} className="cursor-pointer" />
          </a>
          <a href={linkedLn} target="_blank">
            <FontAwesomeIcon icon={faLinkedin} className="cursor-pointer" />
          </a>
          <a href={instagram} target="_blank">
            <FontAwesomeIcon icon={faInstagram} className="cursor-pointer" />
          </a>
        </div>
      </CardBody>
    </Card>
  );
}

const members = [
  {
    img: `${profileKosong}`,
    name: "Ismail Husun",
    title: "Universitas Banten Jaya",
    gitHub: "https://github.com/IsmailHusun19",
    linkedLn: "https://www.linkedin.com/in/ismail-husun-34515a264/",
    instagram: "https://www.instagram.com/ismail_husun19?igsh=MTRlMGYwaWluY29pdg==",
  },
  {
    img: `${profileKosong}`,
    name: "Basil Mulki Faiz Amanullah",
    title: "Universitas Banten Jaya",
    gitHub: "",
    linkedLn: "",
    instagram: "",
  },
  {
    img: `${profileKosong}`,
    name: "Ade Munajat",
    title: "Universitas Banten Jaya",
    gitHub: "",
    linkedLn: "",
    instagram: "",
  },
  {
    img: `${profileKosong}`,
    name: "Devani Resta Paraditya",
    title: "Universitas Banten Jaya",
    gitHub: "",
    linkedLn: "",
    instagram: "",
  },
  {
    img: `${profileKosong}`,
    name: "Zulfikar Imam Sholihin",
    title: "Universitas Banten Jaya",
    gitHub: "",
    linkedLn: "",
    instagram: "",
  },
];

export function Team() {
  const cekLogin = () => {
    return localStorage.getItem("urutanAkun") !== null ? true : false;
  };
  return (
    <>
      {cekLogin() ? <Navbar /> : <NavbarV2 />}
      <section className="min-h-screen py-28 px-8">
      <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
            />
          </svg>
        </div>
        <div className="container mx-auto">
          <div className="mb-5 text-center">
            <Typography
              variant="h1"
              color="blue-gray"
              className="my-2 !text-2xl lg:!text-3xl font-bold"
            >
              Kelompok 3
            </Typography>
            <Typography
              variant="lead"
              className="mx-auto w-full pt-6 !text-gray-700 text-[18px] italic"
            >
              "Tetaplah gigih dalam perjuanganmu menuju keberhasilan. Setiap
              langkah yang kamu ambil membawamu lebih dekat pada impianmu.
              Jangan pernah ragu akan kemampuanmu sendiri, karena keyakinan
              adalah kunci utama untuk mencapai tujuan. Teruslah bergerak maju,
              meski terkadang rintangan menghalangimu. Ingatlah, setiap
              tantangan adalah peluang untuk tumbuh dan berkembang. Keberhasilan
              bukanlah akhir dari perjalanan, tapi awal dari petualangan yang
              lebih besar. Tetaplah bersemangat dan percaya bahwa kamu bisa
              meraih apa pun yang kamu inginkan!"
            </Typography>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {members.map((props, key) => (
              <TeamCard key={key} {...props} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Team;
