import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import BookGridSkeleton from "../components/BookGridSkeleton";
import PageContainer from "../components/PageContainer";
import ProductModal from "../components/ProductModal";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/ui/Button";
import { API_BASE_URL } from "../config/api";
import toast, { Toaster } from "react-hot-toast";

const productUrl = `${API_BASE_URL}/api/Product`;

function ProductPage() {
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [productList, setProductList] = useState([]);
  const [listLoading, setListLoading] = useState(true);

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
    categoryId: null,
  });

  async function fetchProducts() {
    setListLoading(true);
    try {
      const res = await axios.get(productUrl);
      setProductList(res.data);
    } catch {
      toast.error("Failed to fetch products");
      setProductList([]);
    } finally {
      setListLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  async function AddProduct(obj) {
    try {
      await axios.post(productUrl, obj);
      toast.success("Product created");
      setShowModal(false);
      setRefresh(!refresh);
    } catch (err) {
      handleApiErrors(err);
    }
  }

  async function HandleUpdate(obj) {
    try {
      await axios.put(`${productUrl}/${obj.id}`, obj);
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
      await axios.delete(`${productUrl}/${id}`);
      toast.success("Product deleted");
      setRefresh(!refresh);
    } catch {
      toast.error("Delete failed");
    }
  }

  function HandleUpdateModal(id) {
    const product = productList.find((p) => p.id === id);
    setNewProductObj(product);
    setShowModal(true);
  }

  function handleApiErrors(err) {
    const errors = err.response?.data;

    if (!errors) {
      toast.error("Something went wrong");
      return;
    }

    Object.values(errors).forEach((msg) => {
      toast.error(msg);
    });
  }

  function openCreateModal() {
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
      categoryId: null,
    });
    setShowModal(true);
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-12">
      <Toaster position="top-right" />
      <PageContainer>
        <SectionTitle
          eyebrow="Admin"
          title="Product catalog"
          subtitle="Manage inventory in a card layout. Shoppers see the same details on the storefront."
          action={
            <Button type="button" size="md" onClick={openCreateModal}>
              + Create product
            </Button>
          }
          className="mb-10"
        />

        {showModal ? (
          <ProductModal
            AddProduct={AddProduct}
            HandleUpdate={HandleUpdate}
            setShowModal={setShowModal}
            newProductObj={newProductObj}
          />
        ) : null}

        {listLoading ? <BookGridSkeleton count={6} /> : null}

        {!listLoading && productList.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white px-8 py-16 text-center shadow-sm">
            <p className="text-lg font-medium text-slate-800">No products yet</p>
            <p className="mt-2 text-sm text-slate-500">
              Create your first book listing to populate the grid.
            </p>
            <Button type="button" className="mt-6" onClick={openCreateModal}>
              Create product
            </Button>
          </div>
        ) : null}

        {!listLoading && productList.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productList.map((p) => (
              <BookCard
                key={p.id}
                product={p}
                showAddToCart
                footer={
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1 min-w-[5rem]"
                      onClick={() => HandleUpdateModal(p.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      className="flex-1 min-w-[5rem]"
                      onClick={() => HandleDelete(p.id)}
                    >
                      Delete
                    </Button>
                  </div>
                }
              />
            ))}
          </div>
        ) : null}
      </PageContainer>
    </div>
  );
}

export default ProductPage;
