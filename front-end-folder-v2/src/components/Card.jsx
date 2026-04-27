import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  padding = 'p-6',
  shadow = 'shadow-lg',
  border = 'border border-gray-100'
}) => {
  return (
    <div 
      className={`
        bg-white rounded-2xl 
        ${padding} 
        ${shadow} 
        ${border}
        ${hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ 
  children, 
  className = '',
  title,
  subtitle,
  icon
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-100 to-secondary-100 flex items-center justify-center mb-3">
          {icon}
        </div>
      )}
      {title && (
        <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
      )}
      {subtitle && (
        <p className="text-gray-600 text-sm">{subtitle}</p>
      )}
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = '' }) => {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '' }) => {
  return (
    <div className={`mt-6 pt-4 border-t border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

export const ResultCard = ({ 
  title, 
  items = [], 
  icon,
  color = 'primary',
  className = ''
}) => {
  const colorClasses = {
    primary: 'bg-primary-50 border-primary-200',
    secondary: 'bg-secondary-50 border-secondary-200',
    amber: 'bg-amber-50 border-amber-200',
    emerald: 'bg-emerald-50 border-emerald-200',
    blue: 'bg-blue-50 border-blue-200',
  };

  return (
    <Card className={`${colorClasses[color]} ${className}`} hover={false}>
      <CardHeader 
        title={title}
        icon={icon}
      />
      <CardContent>
        {items.length > 0 ? (
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No data available</p>
        )}
      </CardContent>
    </Card>
  );
};

export default Card;