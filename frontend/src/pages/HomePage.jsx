import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import "./HomePage.css"; 

const categories = [
    { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
    { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
    { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
    { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
    { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
    { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
    { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const HomePage = () => {
    const { fetchFeaturedProducts, products, isLoading } = useProductStore();

    useEffect(() => {
        fetchFeaturedProducts();
    }, [fetchFeaturedProducts]);

    return (
        <div className='home-page'>
            <div className='content'>
                <h1 className='title'>
                    Explore Our Categories
                </h1>
                <p className='subtitle'>
                    Discover the latest trends in eco-friendly fashion
                </p>

                <div className='categories'>
                    {categories.map((category) => (
                        <CategoryItem category={category} key={category.name} />
                    ))}
                </div>

                {!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
            </div>
        </div>
    );
};

export default HomePage;
