import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = ({ count = 8 }) => {
  return (
    <div className="row">

      {Array.from({ length: count }).map((_, index) => (

        <div
          className="col-lg-3 col-md-4 col-sm-6 mb-4"
          key={index}
        >

          <div className="card border-0 shadow-sm p-3">

            <Skeleton
              height={220}
              borderRadius={15}
            />

            <Skeleton
              height={25}
              className="mt-3"
            />

            <Skeleton
              width="60%"
              height={20}
            />

            <Skeleton
              height={40}
              className="mt-3"
              borderRadius={10}
            />

          </div>

        </div>

      ))}

    </div>
  );
};

export default SkeletonLoader;