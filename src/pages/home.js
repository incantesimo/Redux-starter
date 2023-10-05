import { useSelector,useDispatch } from "react-redux";
import { addProduct, fetchProducts} from "../store/reducers/products";
import { getUser,fetchUsers } from "../store/reducers/users";
const Home = () => {
    const products = useSelector((state)=>state.products);
    const users = useSelector((state)=>state.users);
    const dispatch = useDispatch();
    //console.log(products)
    return(
        <>
            <h2>All Products</h2>
            {products.loading ? "loading": (
                <>
                    <ul>
                        {products ? products.items.map((item)=>(
                            <li key={item.id}>{item.title}</li>
                        )):null}
                    </ul>
                </>
            )}
            <hr/>
            <button onClick={()=>dispatch(fetchProducts())}>Get Product</button>

            <hr/>
            <h2>Users</h2>
            <button onClick={()=>dispatch(fetchUsers(10))}>Get users</button>
        </>
    )
}

export default Home;