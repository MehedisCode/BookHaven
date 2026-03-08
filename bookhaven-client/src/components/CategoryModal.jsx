import { useState, useEffect } from "react";

function CategoryModal({
    AddCategory,
    HandleUpdate,
    setShowModal,
    errOnName,
    errOnDisplayOrder,
    newCategoryObj,
    setNewCategoryObj,
}) {
    const [tempObj, setTempObj] = useState({
        name: "",
        displayOrder: "",
    });

    const isEdit = newCategoryObj?.id !== null;

    useEffect(() => {
        if (isEdit) {
            setTempObj({
                name: newCategoryObj.name || "",
                displayOrder: newCategoryObj.displayOrder || "",
            });
        }
    }, [newCategoryObj]);

    function handleUpdateSubmit() {
        const updatedObj = {
            ...newCategoryObj,
            name: tempObj.name,
            displayOrder: Number(tempObj.displayOrder),
        };
        setNewCategoryObj(updatedObj);
        HandleUpdate(updatedObj);
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        {isEdit ? "Update Category" : "Create Category"}
                    </h2>
                    <button onClick={() => setShowModal(false)} className="text-2xl">×</button>
                </div>

                {/* Inputs */}
                <div className="flex flex-col gap-3">
                    <input
                        value={tempObj.name}
                        onChange={(e) =>
                            setTempObj({
                                ...tempObj,
                                name: e.target.value,
                            })
                        }
                        type="text"
                        placeholder="Category Name"
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {errOnName && (
                        <span className="text-sm text-red-500">{errOnName}</span>
                    )}

                    <input
                        value={tempObj.displayOrder}
                        onChange={(e) =>
                            setTempObj({
                                ...tempObj,
                                displayOrder: e.target.value,
                            })
                        }
                        type="number"
                        placeholder="Display Order"
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {errOnDisplayOrder && (
                        <span className="text-sm text-red-500">{errOnDisplayOrder}</span>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                    >
                        Cancel
                    </button>

                    {isEdit ? (
                        <button
                            onClick={handleUpdateSubmit}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Update
                        </button>
                    ) : (
                        <button
                            onClick={() => AddCategory(tempObj)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Create
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CategoryModal;
