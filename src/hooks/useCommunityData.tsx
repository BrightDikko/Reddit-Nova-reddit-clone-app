import {
    Community,
    CommunitySnippet,
    communityState,
} from "@/atoms/communitiesAtom";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/clientApp";
import {
    collection,
    doc,
    getDocs,
    increment,
    writeBatch,
} from "firebase/firestore";
import { authModalState } from "@/atoms/authModalAtom";

const useCommunityData = () => {
    const [user] = useAuthState(auth);
    const [communityStateValue, setCommunityStateValue] =
        useRecoilState(communityState);
    const setAuthModalState = useSetRecoilState(authModalState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const joinCommunity = async (communityData: Community) => {
        // If the user is not signed in, open auth modal
        if (!user) {
            setAuthModalState({ open: true, view: "login" });
            return;
        }

        setLoading(true);
        try {
            const batch = writeBatch(firestore);

            // create new community snippet for the user and batch write it
            const newSnippet = {
                communityId: communityData.id,
                imageURL: communityData.imageURL || "",
            };

            batch.set(
                doc(
                    firestore,
                    `users/${user?.uid}/communitySnippets`,
                    communityData.id
                ),
                newSnippet
            );

            // update the numberOfMembers in that community (+1)
            batch.update(doc(firestore, "communities", communityData.id), {
                numberOfMembers: increment(1),
            });

            await batch.commit();

            // update recoil state - communityState.mySnippets
            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: [...prev.mySnippets, newSnippet],
            }));
        } catch (error: any) {
            console.log("joinCommunityError: ", error);
            setError(error.message);
        }
        setLoading(false);
    };

    const leaveCommunity = async (communityId: string) => {
        setLoading(true);
        try {
            const batch = writeBatch(firestore);

            // delete the community snippet from user
            batch.delete(
                doc(
                    firestore,
                    `users/${user?.uid}/communitySnippets`,
                    communityId
                )
            );

            // update the numberOfMembers in that community (-1)
            batch.update(doc(firestore, "communities", communityId), {
                numberOfMembers: increment(-1),
            });

            await batch.commit();

            // update recoil state - communityState.mySnippets
            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: prev.mySnippets.filter(
                    (item) => item.communityId !== communityId
                ),
            }));
        } catch (error: any) {
            console.log("joinCommunityError: ", error);
            setError(error.message);
        }
        setLoading(false);
    };

    const onJoinOrLeaveCommunity = (
        communityData: Community,
        isJoined: boolean
    ) => {
        if (isJoined) {
            leaveCommunity(communityData.id);
            return;
        }

        joinCommunity(communityData);
    };

    const getMySnippets = async () => {
        setLoading(true);
        try {
            //get users snippets
            const snippetDocs = await getDocs(
                collection(firestore, `users/${user?.uid}/communitySnippets`)
            );

            const snippets = snippetDocs.docs.map((snippet) => {
                return { ...snippet.data() };
            });

            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: snippets as CommunitySnippet[],
            }));

            // console.log("User community snippets: ", snippets);
        } catch (error: any) {
            console.log("getMySnippets error", error);
            setError(error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!user) return;
        getMySnippets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return {
        //data and functions
        communityStateValue,
        onJoinOrLeaveCommunity,
        loading,
    };
};

export default useCommunityData;
