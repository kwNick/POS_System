import AddShopForm from "@/components/AddShopForm";

export default function AddShopPage() {
    

    return (
        <div className="p-4 lg:p-8 xl:p-12 flex flex-col gap-y-5 justify-start min-h-[85vh] w-[calc(100%-2rem)] font-[family-name:var(--font-geist-sans)] text-xl">
            <div className="w-full h-[10vh] flex items-center justify-start">
                <h1 className="text-3xl font-semibold mb-4 lg:mb-8 underline">
                Add Shop
                </h1>
            </div>

            <AddShopForm />
        </div>
    );
    
};