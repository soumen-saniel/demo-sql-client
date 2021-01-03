import React from 'react';
import PropType from 'prop-types';
import {connect} from 'react-redux';

// Components
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';

// Styles
import classes from './styles';

const IntegrationSelect = ({
  integration,
  integrations,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        color="primary"
        fullWidth
        disableRipple
        onClick={handleClick}
        variant="outlined"
      >
        {integration.name}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {Object.values(integrations).map((item) => {
          const active = item.id === integration.id;
          return (
            <div
              css={(theme) => classes.listItem(theme, active)}
              key={item.id}
            >
              {item.name}
            </div>
          );
        })}
      </Popover>
    </div>
  );
};

IntegrationSelect.propTypes = {
  integration: PropType.shape({
    id: PropType.string,
    name: PropType.string,
  }),
  integrations: PropType.shape({}),
};

IntegrationSelect.defaultProps = {
  integration: {},
  integrations: {},
};

const mapStateToProps = (state) => ({
  integration: state.integrations[state.currentIntegration],
  integrations: state.integrations,
});

export default connect(mapStateToProps)(IntegrationSelect);
