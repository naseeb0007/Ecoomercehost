import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import styles from './SignUpPage.module.css'; // Import the CSS module

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { signup, loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(formData);
	};

	return (
		<div className={styles.container}>
			<motion.div
				className='sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-emerald-400'>Create your account</h2>
			</motion.div>

			<motion.div
				className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<div className={styles.card}>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div className={styles.inputGroup}>
							<label htmlFor='name' className='block text-sm font-medium text-gray-300'>
								Full name
							</label>
							<div className='relative'>
								<div className={styles.inputIcon}>
									<User className='h-5 w-5' aria-hidden='true' />
								</div>
								<input
									id='name'
									type='text'
									required
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									className={styles.input}
									placeholder='John Doe'
								/>
							</div>
						</div>

						<div className={styles.inputGroup}>
							<label htmlFor='email' className='block text-sm font-medium text-gray-300'>
								Email address
							</label>
							<div className='relative'>
								<div className={styles.inputIcon}>
									<Mail className='h-5 w-5' aria-hidden='true' />
								</div>
								<input
									id='email'
									type='email'
									required
									value={formData.email}
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
									className={styles.input}
									placeholder='you@example.com'
								/>
							</div>
						</div>

						<div className={styles.inputGroup}>
							<label htmlFor='password' className='block text-sm font-medium text-gray-300'>
								Password
							</label>
							<div className='relative'>
								<div className={styles.inputIcon}>
									<Lock className='h-5 w-5' aria-hidden='true' />
								</div>
								<input
									id='password'
									type='password'
									required
									value={formData.password}
									onChange={(e) => setFormData({ ...formData, password: e.target.value })}
									className={styles.input}
									placeholder='••••••••'
								/>
							</div>
						</div>

						<div className={styles.inputGroup}>
							<label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-300'>
								Confirm Password
							</label>
							<div className='relative'>
								<div className={styles.inputIcon}>
									<Lock className='h-5 w-5' aria-hidden='true' />
								</div>
								<input
									id='confirmPassword'
									type='password'
									required
									value={formData.confirmPassword}
									onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
									className={styles.input}
									placeholder='••••••••'
								/>
							</div>
						</div>

						<button
							type='submit'
							className={`${styles.button} ${loading ? styles.buttonDisabled : ''}`}
							disabled={loading}
						>
							{loading ? (
								<>
									<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
									Loading...
								</>
							) : (
								<>
									<UserPlus className='mr-2 h-5 w-5' aria-hidden='true' />
									Sign up
								</>
							)}
						</button>
					</form>

					<p className='mt-8 text-center text-sm text-gray-400'>
						Already have an account?{" "}
						<Link to='/login' className='font-medium text-emerald-400 hover:text-emerald-300'>
							Login here <ArrowRight className='inline h-4 w-4' />
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default SignUpPage;
