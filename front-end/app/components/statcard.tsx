import { useNavigate } from 'react-router';

const StatCard = ({ value, label, color, linkTo }) => {
    const navigate = useNavigate();

    return (
        <div className="col-md-3">
            <div className={`card text-white bg-${color} h-100`} role="button" onClick={() => navigate(linkTo)}>
                <div className="card-body text-center">
                    <h2 className="card-title">{value}</h2>
                    <p className="card-text">{label}</p>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
