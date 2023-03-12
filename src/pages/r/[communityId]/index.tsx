import { Community } from "@/atoms/communitiesAtom";
import CommunityNotFound from "@/components/community/CommunityNotFound";
import Header from "@/components/community/Header";
import PageContent from "@/components/layout/PageContent";
import { firestore } from "@/firebase/clientApp";
import { Flex } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import safeJsonStringify from "safe-json-stringify";

type CommunityPageProps = {
    communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
    console.log("Community Data: ", communityData);
    if (!communityData) {
        return <CommunityNotFound />;
    }
    return (
        <>
            <Header communityData={communityData} />
            <PageContent>
                <>
                    <Flex>LHS</Flex>
                </>

                <>
                    <Flex>RHS</Flex>
                </>
            </PageContent>
        </>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    //get community data and pass it to client

    try {
        const communityDocRef = doc(
            firestore,
            "communities",
            context.query.communityId as string
        );

        const communityDoc = await getDoc(communityDocRef);

        return {
            props: {
                communityData: communityDoc.exists()
                    ? JSON.parse(
                          safeJsonStringify({
                              id: communityDoc.id,
                              ...communityDoc.data(),
                          })
                      )
                    : "",
            },
        };
    } catch (error) {
        // Could add error page here
        console.log("getServerSideProps error", error);
    }
}

export default CommunityPage;
