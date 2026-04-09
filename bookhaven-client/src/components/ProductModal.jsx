import { useState, useEffect } from "react";

function ProductModal({
    AddProduct,
    HandleUpdate,
    setShowModal,
    newProductObj,
}) {
    const [tempObj, setTempObj] = useState({
        title: "",
        description: "",
        isbn: "",
        author: "",
        listPrice: "",
        price: "",
        price50: "",
        price100: "",
        categoryId: null,
        imageUrl: "",
    });

    const [categories, setCategories] = useState([]);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    const isEdit = newProductObj?.id !== null;

    async function handleImageChange(e) {
        const file = e.target.files[0];
        if (!file) return;

        setPreview(URL.createObjectURL(file));
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const oldImageUrl = tempObj.imageUrl ? `?oldImageUrl=${encodeURIComponent(tempObj.imageUrl)}` : "";

            const res = await fetch(`http://localhost:5106/api/Product/upload-product-image${oldImageUrl}`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            setTempObj((prev) => ({ ...prev, imageUrl: data.imageUrl }));
        } catch (err) {
            console.error("Image upload failed:", err);
        } finally {
            setUploading(false);
        }
    }

    function handleSubmit() {
        const payload = {
            ...tempObj,
            listPrice: Number(tempObj.listPrice),
            price: Number(tempObj.price),
            price50: Number(tempObj.price50),
            price100: Number(tempObj.price100),
        };

        if (isEdit) {
            HandleUpdate({ ...newProductObj, ...payload });
        } else {
            AddProduct(payload);
        }
    }

    useEffect(() => {
        if (isEdit) {
            setTempObj({
                title: newProductObj.title || "",
                description: newProductObj.description || "",
                isbn: newProductObj.isbn || "",
                author: newProductObj.author || "",
                listPrice: newProductObj.listPrice || "",
                price: newProductObj.price || "",
                price50: newProductObj.price50 || "",
                price100: newProductObj.price100 || "",
                categoryId: newProductObj.categoryId || null,
                imageUrl: newProductObj.imageUrl || "",
            });
            // Show existing image as preview when editing
            if (newProductObj.imageUrl) {
                setPreview(`http://localhost:5106${newProductObj.imageUrl}`);
            }
        }
    }, [newProductObj]);

    useEffect(() => {
        fetch("http://localhost:5106/api/Category")
            .then((res) => res.json())
            .then((data) => setCategories(data));
    }, []);

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">

                {/* Header */}
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-bold">
                        {isEdit ? "Update Product" : "Create Product"}
                    </h2>
                    <button onClick={() => setShowModal(false)} className="text-xl font-bold">
                        ×
                    </button>
                </div>

                {/* Form */}
                <div className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto">

                    {/* Image Upload */}
                    <div>
                        <label className="text-sm font-medium">Product Image</label>

                        {/* Preview */}
                        <div className="mt-1 mb-2 w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="h-full w-full object-contain"
                                />
                            ) : (
                                <span className="text-gray-400 text-sm">No image selected</span>
                            )}
                        </div>

                        {/* File input and uploading indicator */}
                        <div className="flex items-center gap-3">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="text-sm text-gray-600 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {uploading && (
                                <span className="text-xs text-blue-500 animate-pulse">
                                    Uploading...
                                </span>
                            )}
                            {!uploading && tempObj.imageUrl && (
                                <span className="text-xs text-green-500">✓ Uploaded</span>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Title</label>
                        <input
                            value={tempObj.title}
                            onChange={(e) => setTempObj({ ...tempObj, title: e.target.value })}
                            type="text"
                            className="border rounded px-3 py-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Description</label>
                        <input
                            value={tempObj.description}
                            onChange={(e) => setTempObj({ ...tempObj, description: e.target.value })}
                            type="text"
                            className="border rounded px-3 py-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">ISBN</label>
                        <input
                            value={tempObj.isbn}
                            onChange={(e) => setTempObj({ ...tempObj, isbn: e.target.value })}
                            type="text"
                            className="border rounded px-3 py-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Author</label>
                        <input
                            value={tempObj.author}
                            onChange={(e) => setTempObj({ ...tempObj, author: e.target.value })}
                            type="text"
                            className="border rounded px-3 py-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">List Price</label>
                        <input
                            value={tempObj.listPrice}
                            onChange={(e) => setTempObj({ ...tempObj, listPrice: e.target.value })}
                            type="number"
                            className="border rounded px-3 py-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Price (1-49)</label>
                        <input
                            value={tempObj.price}
                            onChange={(e) => setTempObj({ ...tempObj, price: e.target.value })}
                            type="number"
                            className="border rounded px-3 py-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Price (50-99)</label>
                        <input
                            value={tempObj.price50}
                            onChange={(e) => setTempObj({ ...tempObj, price50: e.target.value })}
                            type="number"
                            className="border rounded px-3 py-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Price (100+)</label>
                        <input
                            value={tempObj.price100}
                            onChange={(e) => setTempObj({ ...tempObj, price100: e.target.value })}
                            type="number"
                            className="border rounded px-3 py-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Category</label>
                        <select
                            value={tempObj.categoryId || ""}
                            onChange={(e) => setTempObj({ ...tempObj, categoryId: e.target.value })}
                            className="border rounded px-3 py-2 w-full"
                        >
                            <option value="">-- Select Category --</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 bg-gray-200 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={uploading}
                        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                    >
                        {isEdit ? "Update" : "Create"}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ProductModal;