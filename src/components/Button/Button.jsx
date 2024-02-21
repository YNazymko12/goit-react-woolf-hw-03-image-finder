import { Button } from './Button.styled';

export const LoadMoreButton = ({ children, loadMore }) => {
  return (
    <Button onClick={() => loadMore()} type="button">
      {' '}
      {children}{' '}
    </Button>
  );
};
