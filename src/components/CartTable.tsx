import { forwardRef } from "react"
import { CartItem } from "../types"
import { ShoppingBag, Plus, Minus } from "lucide-react"

interface CartTableProps {
	items: CartItem[]
	onUpdateQuantity: (itemId: number, amount: number) => void
}

const CartTable = forwardRef<HTMLDivElement, CartTableProps>(({ items, onUpdateQuantity }, ref) => {
	if (items.length === 0) {
		return (
			<div className="text-center py-12">
				<ShoppingBag className="w-20 h-20 mx-auto mb-4" />
				<p className="text-2xl font-black">CART IS EMPTY</p>
				<p className="text-lg font-bold mt-2">Add some cool stuff!</p>
			</div>
		)
	}

	return (
		<div ref={ref} className="neo-border bg-white">
			<table className="w-full">
				<thead>
					<tr className="border-b-4 border-black">
						<th className="py-4 px-4 text-left text-xl font-black">PRODUCT</th>
						<th className="py-4 px-4 text-left text-xl font-black">PRICE</th>
						<th className="py-4 px-4 text-left text-xl font-black">QTY</th>
						<th className="py-4 px-4 text-right text-xl font-black">TOTAL</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => (
						<tr key={item.id} className="border-b-4 border-black last:border-b-0">
							<td className="p-4">
								<div className="flex items-center gap-4">
									<div className="neo-border bg-white min-w-36 h-36 max-w-36">
										<img
											src={item.image}
											alt={item.title}
											className="h-full object-contain mx-auto"
										/>
									</div>
									<div>
										<p className="font-bold text-lg">{item.title}</p>
										<p className="font-mono">ID: {item.id}</p>
									</div>
								</div>
							</td>
							<td className="py-4 px-4">
								<span className="font-mono text-lg font-bold">${item.price.toFixed(2)}</span>
							</td>
							<td className="py-4 px-4">
								<div className="flex items-center gap-2">
									<button
										onClick={() => onUpdateQuantity(item.id, -1)}
										className="neo-button bg-red-400 hover:bg-red-500 w-10 h-10 p-0 flex items-center justify-center"
									>
										<Minus className="w-4 h-4" />
									</button>
									<span className="inline-block font-mono text-lg font-bold bg-pink-400 px-3 py-1 neo-border min-w-[3rem] text-center">
										{item.quantity}
									</span>
									<button
										onClick={() => onUpdateQuantity(item.id, 1)}
										className="neo-button bg-green-400 hover:bg-green-500 w-10 h-10 p-0 flex items-center justify-center"
									>
										<Plus className="w-4 h-4" />
									</button>
								</div>
							</td>
							<td className="py-4 px-4 text-right">
								<span className="font-mono text-lg font-bold">
									${(item.price * item.quantity).toFixed(2)}
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
})

export default CartTable
