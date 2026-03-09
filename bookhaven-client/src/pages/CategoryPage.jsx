import axios from "axios";
import { useEffect, useState } from "react";
import CategoryModal from "../components/CategoryModal";
import { useNotification } from "../utils/useNotification";
import toast, { Toaster } from "react-hot-toast";
import Notification from "../components/Notification";

function CategoryPage() {
    const [refresh, setRefresh] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [errOnName, setErrOnName] = useState();
    const [errOnDisplayOrder, setErrOnDisplayOrder] = useState();

    const { showNotification, setNotification, notification } = useNotification()

    const [fetchedCategoryList, setFetchedCategoryList] = useState([]);

    const [newCategoryObj, setNewCategoryObj] = useState({
        id: null,
        name: "",
        displayOrder: "",
    });

    const url = "http://localhost:5106/api/Category";

    async function AddCategory(obj) {
        try {
            const payload = {
                name: obj.name,
                displayOrder: Number(obj.displayOrder),
            };

            await axios.post(url, payload);
            setShowModal(false);
            setRefresh(!refresh);
            toast.success("Category created successfully!")
        } catch (error) {
            setErrOnName(error.response?.data?.Name);
            setErrOnDisplayOrder(error.response?.data?.DisplayOrder);
        }
    }

    async function HandleUpdateModal(id) {
        let findCategoryObj = fetchedCategoryList.filter((obj) => obj.id == id)[0];
        setNewCategoryObj(findCategoryObj);
        setShowModal(true);
    }

    async function HandleUpdate(updatedObj) {
        try {
            await axios.put(`${url}/${updatedObj.id}`, updatedObj);

            setShowModal(false);
            setRefresh(!refresh);
            toast.success("Category updated successfully!")
        } catch (err) {
            console.log("Error updating data.\n", err);
        }
    }

    async function HandleDelete(id) {
        try {
            var confirm = window.confirm("Sure! You wanna delete item?");
            if (!confirm) return;
            await axios.delete(`${url}/${id}`);
            setRefresh(!refresh);
            toast.success("Category Deleted successfully!")
        } catch (err) {
            console.log(err);
        }
    }

    async function fetchDate() {
        await axios
            .get(url)
            .then((response) => {
                setFetchedCategoryList(response.data);
            })
            .catch((err) => console.log("Error Fetching Category date\n", err));
    }

    useEffect(() => {
        fetchDate();
    }, [showModal, refresh]);

    return (
        <div className="p-6">
            <Toaster position="top-right" />
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">Category List</h1>

                <button
                    onClick={() => {
                        setErrOnName(null);
                        setErrOnDisplayOrder(null);

                        setNewCategoryObj({
                            id: null,
                            name: "",
                            displayOrder: "",
                        });

                        setShowModal(true);
                    }}
                    type="button"
                    className="px-4 py-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
                >
                    Create New Category
                </button>

                {showModal && (
                    <CategoryModal
                        setShowModal={setShowModal}
                        errOnName={errOnName}
                        errOnDisplayOrder={errOnDisplayOrder}
                        AddCategory={AddCategory}
                        HandleUpdate={HandleUpdate}
                        newCategoryObj={newCategoryObj}
                        setNewCategoryObj={setNewCategoryObj}
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

                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-100">
                        {fetchedCategoryList.map((category) => (
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

                                <td>
                                    <button
                                        onClick={() => HandleUpdateModal(category.id)}
                                        className="bg-green-800 rounded text-white text-sm px-2 py-1"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => HandleDelete(category.id)}
                                        className="bg-red-800 rounded text-white text-sm px-2 py-1 ml-1"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CategoryPage;
