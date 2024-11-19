import { useState } from "react"
import { Package2, AlertCircle } from "lucide-react"
import CartForm from "./components/CartForm"
import CartTable from "./components/CartTable"
import CartStats from "./components/CartStats"
import { useCart } from "./hooks/useCart"
import { Toaster } from "sonner"

function App() {
	const { cartItems, addToCart, updateQuantity, getStats } = useCart()
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const handleAddToCart = async (productId: number, quantity: number) => {
		setLoading(true)
		setError(null)

		try {
			const response = await fetch(`https://fakestoreapi.com/products/${productId}`)
			if (!response.ok) {
				throw new Error("Product not found")
			}

			const product = await response.json()
			addToCart({ ...product, quantity })
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to fetch product")
		} finally {
			setLoading(false)
		}
	}

	const stats = getStats()

	return (
		<div className="min-h-screen bg-[#ffde00] p-8 flex flex-col">
			<div className="max-w-7xl mx-auto flex flex-col h-full flex-1">
				<div className="flex items-center gap-4 mb-8">
					<div className="p-2 bg-black rounded-full">
						<img src="" alt="" />
						<Package2 className="w-8 h-8 text-[#ffde00]" />
					</div>
					<h1 className="text-4xl font-black">Wallbit Cart</h1>
				</div>

				<CartStats stats={stats} />

				<div className="grid gap-8 md:grid-cols-[1fr,2fr] flex-1 ">
					<div className="neo-border bg-white p-6 h-max">
						<h2 className="text-2xl font-black mb-6">ADD PRODUCT</h2>
						<CartForm onSubmit={handleAddToCart} loading={loading} />

						{error && (
							<div className="mt-6 neo-border bg-red-400 p-4 flex items-center gap-3">
								<AlertCircle className="w-6 h-6" />
								<p className="font-bold">{error}</p>
							</div>
						)}
					</div>

					<div className="flex flex-col flex-1">
						<h2 className="text-2xl font-black mb-6">CART ITEMS</h2>
						<CartTable items={cartItems} onUpdateQuantity={updateQuantity} />
					</div>
				</div>
			</div>
			<Toaster richColors />
		</div>
	)
}

export default App
