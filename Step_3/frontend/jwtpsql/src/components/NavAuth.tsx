import AuthButtons from "./AuthButtons";
import AdminButton from "./AdminButton";
import HomeButton from "./HomeButton";

const NavAuth = async () => {

    return (
        <div className="p-5 lg:p-8 lg:px-12 w-full h-full flex items-center justify-around bg-black shadow-md">
            <HomeButton />

            <AdminButton />

            <AuthButtons />
        </div>
    )
}
export default NavAuth