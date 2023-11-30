type HeadingProps = { title: string};

export const Header = (props: HeadingProps) => {

  return (
    <div className="header">
            <div className="flex-auto">
                {props.title}
            </div>
    </div>
  );
};