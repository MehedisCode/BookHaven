import axios from "axios";
import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import CategoryModal from "../components/CategoryModal";
import toast, { Toaster } from "react-hot-toast";

function CategoryPage() {
    const [refresh, setRefresh] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [errOnName, setErrOnName] = useState(null);
    const [errOnDisplayOrder, setErrOnDisplayOrder] = useState(null);

    const [fetchedCategoryList, setFetchedCategoryList] = useState([]);
    const [newCategoryObj, setNewCategoryObj] = useState({
        id: null,
        name: "",
        displayOrder: "",
    });

    const url = "http://localhost:5106/api/Category";

    // Fetch Categories
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            setFetchedCategoryList(response.data);
        } catch (err) {
            console.error("Error fetching categories:", err);
            toast.error("Failed to load categories");
        } finally {
            setLoading(false);
        }
    };

    // Create Category
    const AddCategory = async (obj) => {
        try {
            const payload = {
                name: obj.name,
                displayOrder: Number(obj.displayOrder),
            };

            await axios.post(url, payload);
            setShowModal(false);
            setRefresh(!refresh);
            toast.success("Category created successfully!");
        } catch (error) {
            setErrOnName(error.response?.data?.Name?.[0]);
            setErrOnDisplayOrder(error.response?.data?.DisplayOrder?.[0]);
        }
    };

    // Open Edit Modal
    const handleEdit = (id) => {
        const categoryToEdit = fetchedCategoryList.find((c) => c.id === id);
        setNewCategoryObj(categoryToEdit);
        setErrOnName(null);
        setErrOnDisplayOrder(null);
        setShowModal(true);
    };

    // Update Category
    const HandleUpdate = async (updatedObj) => {
        try {
            await axios.put(`${url}/${updatedObj.id}`, updatedObj);
            setShowModal(false);
            setRefresh(!refresh);
            toast.success("Category updated successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update category");
        }
    };

    // Delete Category
    const HandleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        try {
            await axios.delete(`${url}/${id}`);
            setRefresh(!refresh);
            toast.success("Category deleted successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete category");
        }
    };

    // Reset form when opening for new category
    const openCreateModal = () => {
        setNewCategoryObj({ id: null, name: "", displayOrder: "" });
        setErrOnName(null);
        setErrOnDisplayOrder(null);
        setShowModal(true);
    };

    useEffect(() => {
        fetchCategories();
    }, [refresh]);

    return (
        <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
            <Toaster position="top-right" />

            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
                    <div>
                        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
                            Categories
                        </h1>
                        <p className="mt-2 text-slate-600">
                            Manage your book categories and display order
                        </p>
                    </div>

                    <button
                        onClick={openCreateModal}
                        className="mt-6 sm:mt-0 flex items-center gap-3 rounded-2xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-700 hover:shadow-xl active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        New Category
                    </button>
                </div>

                {/* Table Card */}
                <div className="rounded-3xl bg-white shadow-xl shadow-slate-200/70 overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
                            <p className="mt-4 text-slate-500">Loading categories...</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-100">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-8 py-5 text-left text-sm font-semibold text-slate-600">ID</th>
                                        <th className="px-8 py-5 text-left text-sm font-semibold text-slate-600">Category Name</th>
                                        <th className="px-8 py-5 text-left text-sm font-semibold text-slate-600">Display Order</th>
                                        <th className="px-8 py-5 text-right text-sm font-semibold text-slate-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {fetchedCategoryList.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-8 py-20 text-center">
                                                <div className="mx-auto w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-4xl mb-4">
                                                    📚
                                                </div>
                                                <p className="text-slate-500 text-lg">No categories found</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        fetchedCategoryList.map((category) => (
                                            <tr
                                                key={category.id}
                                                className="group hover:bg-slate-50 transition-colors"
                                            >
                                                <td className="px-8 py-5 text-sm font-medium text-slate-500">
                                                    #{category.id}
                                                </td>
                                                <td className="px-8 py-5 text-sm font-semibold text-slate-900">
                                                    {category.name}
                                                </td>
                                                <td className="px-8 py-5 text-sm text-slate-600 font-medium">
                                                    {category.displayOrder}
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => handleEdit(category.id)}
                                                            className="flex items-center gap-2 rounded-xl bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-200 transition"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => HandleDelete(category.id)}
                                                            className="flex items-center gap-2 rounded-xl bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 transition"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Footer Info */}
                <p className="text-center text-xs text-slate-400 mt-8">
                    {fetchedCategoryList.length} categories • Last updated just now
                </p>
            </div>

            {/* Modal */}
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
    );
}

export default CategoryPage;