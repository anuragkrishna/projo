/*jshint esversion: 6 */

import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({name, value, label, error, type, onChange, isItemExists}) => {
		
	return (
			<div className={classnames("form-group", {'has-error':error})}>
	            <input
	              className="form-control input-lg"	
	              value={value}
	              onBlur={isItemExists}
	              type={type}
	              name={name}
	              placeholder={label}
	              onChange={onChange}
	              />
	              {error && <div className="alert alert-warning" role="alert">
                       <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                       <span className="sr-only alert alert-danger">Error:</span>
                          {error}
                    </div>}
         	</div>
		);
}

TextFieldGroup.propTypes = {
	name: React.PropTypes.string.isRequired,
	value: React.PropTypes.string.isRequired,
	label: React.PropTypes.string,
	error: React.PropTypes.string,
	type: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func.isRequired,
	checkUserExists: React.PropTypes.func
}

TextFieldGroup.defaultProps = {
	type: 'text'
}

export default TextFieldGroup;