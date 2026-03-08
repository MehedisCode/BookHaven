function AddCategoryModal({ setShowModal, setCategoryName, setCategoryOrder, AddCategory, errOnName, errOnDisplayOrder }) {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Create Category</h2>
                    <button onClick={() => setShowModal(false)} className="text-2xl">×</button>
                </div>

                {/* Inputs */}
                <div className="flex flex-col gap-3">
                    <input
                        onChange={(e) => setCategoryName(e.target.value)}
                        type="text"
                        placeholder="Category Name"
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errOnName && <span className="text-sm text-red-500">{errOnName}</span>}
                    <input
                        onChange={(e) => setCategoryOrder(e.target.value)}
                        type="number"
                        placeholder="Display Order"
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errOnDisplayOrder && <span className="text-sm text-red-500">{errOnDisplayOrder}</span>}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 mt-4">
                    <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">Cancel</button>
                    <button onClick={() => AddCategory()} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create</button>
                </div>

            </div>
        </div>
    )
}

export default AddCategoryModal;