import React from 'react';
import ReactDOM from 'react-dom';

function Dutylist() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>

                        <div className="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dutylist;

import { createRoot } from 'react-dom/client';

if (document.getElementById('dutylist')) {
    createRoot(document.getElementById('dutylist')).render(<Dutylist />);
}
