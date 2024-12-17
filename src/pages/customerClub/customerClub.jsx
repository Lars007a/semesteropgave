import Header from "../../comps/header/header.jsx";
import headerImg from "../../assets/heros/medlem.jpg";
import CustomerClubForm from "../../comps/customerClubForm/customerClubForm.jsx";

export default function customerClub() {
  return (
    <>
    <Header fullCover={false} title={"Bliv medlem af vores"} secondText={"KUNDEKLUB"} img={headerImg} thirdText={"Og få eksklusive muligheder før alle andre"}/>
    <CustomerClubForm/>
    </>
  )
}
