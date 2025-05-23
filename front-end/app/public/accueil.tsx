import { Link } from "react-router";

export function Accueil() {
    return (
        <>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img src="../assets/6bdb69f2e082e2074015098f4a14f6b0.png" className="d-block w-100" />
                    </div>
                    <div className="carousel-item">
                    <img src="../assets/94d3b3a61c62a69250d8475788036df9--shadow-the-hedgehog-brave.jpg" className="d-block w-100" />
                    </div>
                    <div className="carousel-item">
                    <img src="../assets/599fbc6b956a9c27dae863e0da4a611929387764_s2_n1.png" className="d-block w-100" />
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </>
    );
}