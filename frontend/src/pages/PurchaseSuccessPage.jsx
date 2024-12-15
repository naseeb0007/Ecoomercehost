import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";
import styles from './PurchaseSuccessPage.module.css'; // Import the CSS module

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const { clearCart } = useCartStore();
	const [error, setError] = useState(null);

	useEffect(() => {
		const handleCheckoutSuccess = async (sessionId) => {
			try {
				await axios.post("/payments/checkout-success", {
					sessionId,
				});
				clearCart();
			} catch (error) {
				console.log(error);
			} finally {
				setIsProcessing(false);
			}
		};

		const sessionId = new URLSearchParams(window.location.search).get("session_id");
		if (sessionId) {
			handleCheckoutSuccess(sessionId);
		} else {
			setIsProcessing(false);
			setError("No session ID found in the URL");
		}
	}, [clearCart]);

	if (isProcessing) return "Processing...";

	if (error) return `Error: ${error}`;

	return (
		<div className={styles.container}>
			<Confetti
				className={styles.confetti}
				gravity={0.1}
				numberOfPieces={700}
				recycle={false}
			/>

			<div className={styles.card}>
				<div className={styles.cardContent}>
					<div className='flex justify-center'>
						<CheckCircle className={styles.icon} />
					</div>
					<h1 className={styles.title}>
						Purchase Successful!
					</h1>

					<p className={styles.subtitle}>
						Thank you for your order. {"We're"} processing it now.
					</p>
					<p className={styles.textInfo}>
						Check your email for order details and updates.
					</p>
					<div className={styles.orderInfo}>
						<div className={styles.infoItem}>
							<span className={styles.infoLabel}>Order number</span>
							<span className={styles.infoValue}>#12345</span>
						</div>
						<div className={styles.infoItem}>
							<span className={styles.infoLabel}>Estimated delivery</span>
							<span className={styles.infoValue}>3-5 business days</span>
						</div>
					</div>

					<div className='space-y-4'>
						<button className={`${styles.button} ${styles.buttonPrimary}`}>
							<HandHeart className={`${styles.buttonIcon}`} size={18} />
							Thanks for trusting us!
						</button>
						<Link to={"/"} className={`${styles.button} ${styles.buttonSecondary}`}>
							Continue Shopping
							<ArrowRight className={`${styles.buttonIcon} ${styles.buttonIconRight}`} size={18} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PurchaseSuccessPage;
