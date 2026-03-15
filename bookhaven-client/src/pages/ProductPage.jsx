import axios from "axios";
import { useEffect, useState } from "react";
import ProductModal from "../components/ProductModal";
import toast, { Toaster } from "react-hot-toast";

function ProductPage() {
    const [refresh, setRefresh] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [productList, setProductList] = useState([]);

    const [newProductObj, setNewProductObj] = useState({
        id: null,
        title: "",
        description: "",
        isbn: "",
        author: "",
        listPrice: "",
        price: "",
        price50: "",
        price100: "",
        categoryId: null
    });

    const url = "http://localhost:5106/api/Product";

    async function fetchProducts() {
        try {
            const res = await axios.get(url);
            setProductList(res.data);
        } catch {
            toast.error("Failed to fetch products");
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [refresh]);

    async function AddProduct(obj) {
        try {
            await axios.post(url, obj);
            toast.success("Product created");
            setShowModal(false);
            setRefresh(!refresh);
        } catch (err) {
            handleApiErrors(err);
        }
    }

    async function HandleUpdate(obj) {
        console.log("obj - ", obj)
        try {
            await axios.put(`${url}/${obj.id}`, obj);
            toast.success("Product updated");
            setShowModal(false);
            setRefresh(!refresh);
        } catch (err) {
            handleApiErrors(err);
        }
    }

    async function HandleDelete(id) {
        if (!window.confirm("Delete this product?")) return;

        try {
            await axios.delete(`${url}/${id}`);
            toast.success("Product deleted");
            setRefresh(!refresh);
        } catch {
            toast.error("Delete failed");
        }
    }

    function HandleUpdateModal(id) {
        const product = productList.find(p => p.id === id);
        setNewProductObj(product);
        setShowModal(true);
    }

    function handleApiErrors(err) {
        const errors = err.response?.data;

        if (!errors) {
            toast.error("Something went wrong");
            return;
        }

        Object.values(errors).forEach(msg => {
            toast.error(msg);
        });
    }

    return (
        <div className="p-6">
            <Toaster position="top-right" />
            <div className="flex justify-between mb-4">
                <h1 className="text-3xl font-bold">
                    Product List
                </h1>
                <button
                    onClick={() => {
                        setNewProductObj({
                            id: null,
                            title: "",
                            description: "",
                            isbn: "",
                            author: "",
                            listPrice: "",
                            price: "",
                            price50: "",
                            price100: "",
                            categoryId: null
                        });

                        setShowModal(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Create Product
                </button>
            </div>

            {showModal && (
                <ProductModal
                    AddProduct={AddProduct}
                    HandleUpdate={HandleUpdate}
                    setShowModal={setShowModal}
                    newProductObj={newProductObj}
                />
            )}

            <table className="min-w-full border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border">Id</th>
                        <th className="p-2 border">Title</th>
                        <th className="p-2 border">Author</th>
                        <th className="p-2 border">Price</th>
                        <th className="p-2 border">Category</th>
                        <th className="p-2 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {productList.map(p => (
                        <tr key={p.id} className="text-center">
                            <td className="border p-2">{p.id}</td>
                            <td className="border p-2">{p.title}</td>
                            <td className="border p-2">{p.author}</td>
                            <td className="border p-2">{p.price}</td>
                            <td className="border p-2">{p.category?.name ?? "—"}</td>
                            <td className="border p-2">
                                <button
                                    onClick={() => HandleUpdateModal(p.id)}
                                    className="bg-green-600 text-white px-2 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => HandleDelete(p.id)}
                                    className="bg-red-600 text-white px-2 py-1 rounded ml-2"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductPage;