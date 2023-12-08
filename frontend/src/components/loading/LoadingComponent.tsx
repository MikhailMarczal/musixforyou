import styles from "./Loading.module.css"

export default function LoadingComponent() {
    return (
        <div className="flex justify-center items-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 66 66"
                height="100px"
                width="100px"
                className={`${styles.spinner} w-[250px] h-[150px] relative rounded-full`}
            >
                <circle
                    stroke="url(#gradient)"
                    r="25"
                    cy="33"
                    cx="33"
                    strokeWidth="3"
                    fill="transparent"
                    className={styles.path}
                ></circle>
                <linearGradient id="gradient">
                    <stop
                        stopOpacity="1"
                        stopColor="#0B5EAA"
                        offset="0%"
                    ></stop>
                    <stop
                        stopOpacity="0"
                        stopColor="#ffffff"
                        offset="100%"
                    ></stop>
                </linearGradient>
            </svg>
        </div>
    );
}
