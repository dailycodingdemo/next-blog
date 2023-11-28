"use client";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";
import { Database } from "@/lib/types/supabase";
import { createBrowserClient } from "@supabase/ssr";
import React, { useEffect, useState } from "react";
import BlogLoading from "./BlogLoading";

export default function BlogContent({ blogId }: { blogId: string }) {
	const [blog, setBlog] = useState<{
		blog_id: string;
		content: string;
		created_at: string;
	} | null>();
	const [isLoading, setLoading] = useState(true);

	const supabase = createBrowserClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);
	const readBLogContent = async () => {
		const { data } = await supabase
			.from("blog_content")
			.select("*")
			.eq("blog_id", blogId)
			.single();
		setBlog(data);
		setLoading(false);
	};

	useEffect(() => {
		readBLogContent();
		// eslint-disable-next-line
	}, []);

	if (isLoading) {
		return <BlogLoading />;
	}

	return (
		<MarkdownPreview className="sm:px-10" content={blog?.content || ""} />
	);
}