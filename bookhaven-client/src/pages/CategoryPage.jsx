import axios from "axios"
import { useEffect, useState } from "react"
import AddCategoryModal from "../components/AddCategoryModal"

async function fetchDate(setCategoryData) {
    const url = "http://localhost:5106/api/Category"
    await axios.get(url)
        .then((response) => {
            setCategoryData(response.data);
        })
        .catch((err) => console.log("Error Fetching Category date\n", err))
}

function CategoryPage() {
    const [categoryData, setCategoryData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [categoryName, setCategoryName] = useState();
    const [categoryOrder, setCategoryOrder] = useState();
    const [errOnName, setErrOnName] = useState();
    const [errOnDisplayOrder, setErrOnDisplayOrder] = useState();

    let categoryDataObj = {
        name: categoryName,
        displayOrder: categoryOrder
    }

    async function AddCategory() {
        const url = "http://localhost:5106/api/Category"
        try {
            await axios.post(url, categoryDataObj);
            setShowModal(false);
        } catch (error) {
            setErrOnName(error.response.data["Name"]);
            setErrOnDisplayOrder(error.response.data["DisplayOrder"])
        }
    }

    useEffect(() => {
        fetchDate(setCategoryData);
    }, [showModal])

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">Category List</h1>
                <button
                    onClick={() => setShowModal(!showModal)}
                    type="button"
                    className="px-4 py-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Create New Category
                </button>

                {showModal && (
                    <AddCategoryModal
                        setShowModal={setShowModal}
                        setCategoryName={setCategoryName}
                        setCategoryOrder={setCategoryOrder}
                        AddCategory={AddCategory}
                        errOnName={errOnName}
                        errOnDisplayOrder={errOnDisplayOrder}
                    />
                )}

            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                                ID
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                                Category Name
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                                Display Order
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {categoryData.map((category) => (
                            <tr key={category.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm text-gray-800">
                                    {category.id}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-800">
                                    {category.name}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-800">
                                    {category.displayOrder}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CategoryPage
