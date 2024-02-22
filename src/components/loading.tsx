export default function Loading()  {

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            <p className="text-5xl font-bold text-gray-900">Cargando...</p>
        </div>
    );
}