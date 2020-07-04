import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';

function component() {
    const element = document.createElement('div');
    // element.classList += 'row'
    element.innerHTML = `
    <div class="col-12 text-center">
        <h5>Under Development...</h5>
    </div>
`;

    return element;
}
document.body.appendChild(component());