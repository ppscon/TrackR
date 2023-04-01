import React from 'react';

const Driver = React.memo(({ driver, deliveries }) => {
    return (
        <div key={driver.id}>
            <h3>{driver.name}</h3>
            <ul>
                {deliveries
                    .filter((delivery) => delivery.driver_id === driver.id)
                    .map((delivery) => (
                        <li key={delivery.id}>
                            Drop {delivery.drop_number}: {delivery.address}
                        </li>
                    ))}
            </ul>
        </div>
    );
});

export default Driver;
