const Loader = (props) => {
    return (
        <div className={`h-screen w-screen flex justify-center items-center bg-neutral-200 ${(!props.isVisible) && "absolute invisible"}`}>
            <img src="./assets/loading.svg" alt="Loading" />
        </div>
    );
}

export default Loader;