import PropTypes from 'prop-types';
import '../../Styles/login.css';

function Input_Main({ type, label, onChange, placeholder, required, disabled, name, value }) {
    return (
        <div>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}   
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className="input"
            />
        </div>
    );
}

Input_Main.propTypes = {
    type: PropTypes.string.isRequired, 
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,   
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    name: PropTypes.string.isRequired,  
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,  
};

export default Input_Main;
