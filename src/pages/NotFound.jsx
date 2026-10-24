import { Link } from 'react-router-dom';
import Icon from '../components/common/Icon';

export default function NotFound() {
  return (
    <div className="page not-found">
      <div className="not-found__card">
        <span className="not-found__code">404</span>
        <h1>Page not found</h1>
        <p>
          The page you are looking for doesn't exist or has been moved. Check the URL or head back to a
          working section.
        </p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn--primary">
            <Icon name="dashboard" size={15} />
            Go to dashboard
          </Link>
          <Link to="/learn" className="btn btn--soft">
            Browse courses
          </Link>
          <Link to="/challenges" className="btn btn--ghost">
            Solve challenges
          </Link>
        </div>
      </div>
    </div>
  );
}
