import AuthButtons from "./AuthButtons";
import HomeButton from "./HomeButton";

const NavAuth = async () => {

    return (
        <div className="p-5 lg:p-8 lg:px-12 w-full h-full flex items-center justify-around">
            <HomeButton />

            <AuthButtons />
        </div>
    )
}
export default NavAuth