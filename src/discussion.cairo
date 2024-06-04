use starknet::ContractAddress;
use konoha::types::Comment;

#[starknet::interface]
trait IDiscussion<TContractState> {
    fn add_comment(ref self: TContractState, prop_id: u32, ipfs_hash: ByteArray );
    fn get_comments(self: @TContractState, prop_id: u32) -> Array<Comment>;
} 

#[starknet::component]
mod discussion {
    use array::ArrayTrait;
    use core::box::Box;
    use core::serde::Serde;

    use starknet::get_caller_address;
    use starknet::ContractAddress;

    use konoha::proposals::proposals as proposals_component;
    use konoha::proposals::proposals::ProposalsImpl;
    use konoha::traits::IERC20Dispatcher;
    use konoha::traits::IERC20DispatcherTrait;
    use konoha::traits::get_governance_token_address_self;
    use konoha::types::Comment;

    // Storage implementation entails comments and comment_count
    // Comments is mapping of (proposal id, index) to comment
    // While the comment_count is a mapping of proposal id to number of comments
    #[storage]
    struct Storage {
        comments: LegacyMap::<(u32, u64), Comment>,
        comment_count: LegacyMap::<u32, u64>
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {}

    #[embeddable_as(DiscussionImpl)]
    impl Discussions<TContractState, +HasComponent<TContractState>,
    +Drop<TContractState>,
    impl Proposals: proposals_component::HasComponent<TContractState>,
    > of super::IDiscussion<ComponentState<TContractState>> {
        fn add_comment(ref self: ComponentState<TContractState>, prop_id: u32, ipfs_hash: ByteArray ) {
            //Check if proposal is live 
            let is_live = self.is_proposal_live(prop_id);
            assert(is_live, 'Proposal is not live!');

            //Check if caller is a CRAM token holder
            let user_address = get_caller_address();
            let govtoken_addr = get_governance_token_address_self();
            let caller_balance : u256 = IERC20Dispatcher { contract_address: govtoken_addr }
                .balanceOf(user_address);
            assert(caller_balance.high != 0 || caller_balance.low != 0, 'Govtoken balance is zero');

            //get current comment count 
            let count: u64 = self.comment_count.read(prop_id);

            //store new comment/ipfs_hash at next index
            let new_comment = Comment {user: user_address, ipfs_hash: ipfs_hash};
            self.comments.write((prop_id, count), new_comment);

            //Increment comment count for proposal by one
            self.comment_count.write(prop_id, count + 1);
            
        }

        fn get_comments(self: @ComponentState<TContractState>, prop_id: u32) -> Array<Comment> {
            //Get comment counts 
            let count: u64 = self.comment_count.read(prop_id);

            //Initialize an array of comments
            let mut arr = ArrayTrait::<Comment>::new();

            // loop over comment count and collect comments
            let mut i: u64 = 0;
            loop {
                if i >= count {
                    break;
                }

                //collect comment at position i
                // let com: Comment = self.comments.read((prop_id, i));
                // arr.append((com.user, com.ipfs_hash));
                
                arr.append(self.comments.read((prop_id, i)));
                i += 1;  
            };

            // return array of comments
            arr
        }
    }

    #[generate_trait]
    impl InternalImpl<TContractState, +HasComponent<TContractState>,
    +Drop<TContractState>,
    impl Proposals: proposals_component::HasComponent<TContractState>,
    > of InternalTrait<TContractState> {
        fn is_proposal_live(ref self: ComponentState<TContractState>, prop_id: u32 ) -> bool {

            let proposals_comp = get_dep_component!(@self, Proposals);

            let live_proposals = proposals_comp.get_live_proposals();

            let mut is_live = false;

            //loop over the array to check if prop_id is in the array
            let mut i = 0;
            loop {
                if i >= live_proposals.len() {
                    break;
                }

                match live_proposals.get(i) {
                    Option::Some(_prop_id) => {
                        is_live = true;
                        break;
                    },
                    Option::None => i += 1
                }
            };
            is_live
        }
    }
}