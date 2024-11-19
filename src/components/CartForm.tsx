import React, { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

interface CartFormProps {
	onSubmit: (productId: number, quantity: number) => Promise<void>
	loading: boolean
}

function CartForm({ onSubmit, loading }: CartFormProps) {
	const [productId, setProductId] = useState("")
	const [quantity, setQuantity] = useState(1)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!productId) {
			toast.error("Product ID is required")
			return
		}

		const productIdAsNumber = Number(productId)

		if (productIdAsNumber > 20) {
			toast.error("Product ID must be less than or equal to 20")
			return
		}
		if (productIdAsNumber < 1) {
			toast.error("Product ID must be greater than or equal to 1")
			return
		}

		if (productId && quantity) {
			onSubmit(Number(productId), quantity)
			setProductId("")
			setQuantity(1)
		}
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div>
				<label htmlFor="productId" className="block text-2xl font-black mb-2">
					Product ID
				</label>
				<input
					type="number"
					id="productId"
					value={productId}
					onChange={(e) => setProductId(e.target.value)}
					min="1"
					required
					className="neo-input w-full"
					placeholder="1337"
				/>
			</div>

			<div>
				<label htmlFor="quantity" className="block text-2xl font-black mb-2">
					Initial Quantity
				</label>
				<input
					type="number"
					id="quantity"
					value={quantity}
					onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
					className="neo-input w-full"
					min="1"
				/>
			</div>

			<button
				type="submit"
				disabled={loading}
				className="neo-button w-full bg-blue-400 hover:bg-blue-500 text-xl h-14"
			>
				{loading ? (
					<span className="flex items-center justify-center gap-2">
						<Loader2 className="w-6 h-6 animate-spin" />
						ADDING...
					</span>
				) : (
					"ADD TO CART"
				)}
			</button>
		</form>
	)
}

export default CartForm
