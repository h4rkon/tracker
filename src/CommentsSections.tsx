import Collapsible from "react-collapsible";
// CommentsSection.tsx

type CommentsSectionProps = {
    open: boolean;
    comments: {
        user: string;
        datetime: string;
        comment: string;
    }[];
};

const CommentsSection: React.FC<CommentsSectionProps> = ({ open, comments }) => {
    return (
        <Collapsible trigger="Comments" open={open} className='comments-collapsible'>
            <table className="comments-table">
                <tbody>
                    {comments.map((comment, index) => (
                        <tr key={index}>
                            <td>
                                <div>{comment.user} at {comment.datetime.toLocaleString()}</div>
                                <div>{comment.comment}</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Collapsible>
    );
};

export default CommentsSection;
