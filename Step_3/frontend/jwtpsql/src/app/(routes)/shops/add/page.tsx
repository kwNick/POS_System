import AddShopForm from "@/components/AddShopForm";

export default function AddShopPage() {
    

    return (
        <div className="p-4 lg:p-8 xl:p-12 flex flex-col gap-y-5 justify-center min-h-[85vh] w-[calc(100%-2rem)] font-[family-name:var(--font-geist-sans)] text-xl">
            <AddShopForm />
        </div>
    );
    
};