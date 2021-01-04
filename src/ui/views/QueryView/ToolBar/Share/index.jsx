import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Actions
import {
  addTeamMember,
  removeTeamMember,
  updateMemberPermission,
} from '../../../../../state/queries';

// Components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import ShareIcon from '@material-ui/icons/Share';

// Styles
import classes from './styles';

const allPermissions = [
  'owner',
  'editor',
  'viewer',
];

const permissions = [
  'editor',
  'viewer',
];

const Share = ({
  addTeamMember,
  currentQuery,
  members,
  removeTeamMember,
  updateMemberPermission,
  user,
}) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState('editor');

  const onClose = () => {
    setOpen(false);
    setEmail('');
    setPermission('editor');
  };

  return (
    <>
      <div
        css={classes.button}
        onClick={() => setOpen(true)}
      >
        <span>Share</span>
        <ShareIcon css={classes.icon} />
      </div>
      <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogTitle
          css={classes.title}
          disableTypography
        >
          <span>Share</span>
          <CloseIcon
            css={classes.closeIcon}
            onClick={onClose}
          />
        </DialogTitle>
        <DialogContent
          css={classes.root}
        >
          <div css={classes.controlsContainer}>
            <div css={classes.inputContainer}>
              <div css={classes.inputLabel}>
                Email
              </div>
              <Input
                placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                value={email}
              />
            </div>
            <div css={classes.inputContainer}>
              <div css={classes.inputLabel}>
                Permission
              </div>
              <Select
                onChange={(e) => setPermission(e.target.value)}
                options={permissions}
                value={permission}
              />
            </div>
            <Button
              color='primary'
              disableRipple
              onClick={() => {
                if (email.trim()) {
                  addTeamMember(email, permission, currentQuery.id);
                  setEmail('');
                  setPermission('editor');
                }
              }}
              variant='contained'
            >
              Share
            </Button>
          </div>
          <h3>Team Members</h3>
          <div css={classes.membersList}>
            {members.map((member) => {
              const isOwner = member.permission === 'owner';
              const isSelf = member.email === user.email;
              return (
                <div
                  key={member.email}
                  css={(theme) => classes.membersContainer(theme, isSelf)}
                >
                  <div css={classes.email}>{member.email}</div>
                  <Select
                    disabled={isOwner}
                    onChange={(e) => {
                      updateMemberPermission(
                          member.email,
                          e.target.value,
                          currentQuery.id,
                      );
                    }}
                    options={isOwner ? allPermissions : permissions}
                    value={member.permission}
                  />
                  {!isSelf && (
                    <CloseIcon
                      css={classes.removeIcon}
                      onClick={() => {
                        removeTeamMember(member.email, currentQuery.id);
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

Share.propTypes = {
  addTeamMember: PropTypes.func,
  currentQuery: PropTypes.shape({
    id: PropTypes.string,
  }),
  members: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string,
    permission: PropTypes.string,
  })),
  removeTeamMember: PropTypes.func,
  updateMemberPermission: PropTypes.func,
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
};

Share.defaultProps = {
  members: [],
  user: {},
};

const mapStateToProps = (state) => {
  const currentTab = state.currentTab !== null ?
    state.tabs[state.currentTab] || {} :
    {};
  const currentQuery = state.queries[currentTab.queryId] || {};

  return {
    currentQuery,
    members: currentQuery.members || [],
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  addTeamMember,
  removeTeamMember,
  updateMemberPermission,
})(Share);
