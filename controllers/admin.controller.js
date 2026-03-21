import { generateToken } from "../functions/functions.js";

import { database } from "../functions/db.js";

const users = database.collection('users')
const manufacturers = database.collection('manufacturers')
const products_collection = database.collection('products')
const deals_collection = database.collection('deals')
const reports_collection = database.collection('reports')

export const login_controller = async (req, res) => {
    try {
        const { username, password } = req.body;


        const data = await users.findOne({ username, password })

        if (data) {
            const token = generateToken({ username, password });
            res.cookie("token", token, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            return res.status(200).json({ token, username, email: username + "@gmail.com", message: "success" })
        }
        else {
            return res.status(400).json({ message: "incorrect credential" });
        }

    } catch (error) {
        console.log("🔥 LOGIN ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const get_products_controller = async (req, res) => {
    try {
        const category = req.query?.category

        if (category) {
            const data = await products_collection.find({ category }).toArray();
            return res.status(200).json({
                status: true,
                category: category,
                products: data
            })
        }
        const data = await products_collection.find().toArray();
        return res.status(200).json({ success: true, category: "all", data: data })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }

}

export const get_manufacturers_details = async (req, res) => {
    try {
        const data = await manufacturers.find().toArray()
        return res.status(200).json({ success: true, data: data })
    } catch (error) {
        console.log("error found", error.message)
        return res.status(400).json({ success: false, message: error.message })
    }
}

export const delete_products_controller = async (req, res) => {
    try {

        let idToDelete = req.body?.item_id;
        if (!idToDelete) return res.status(400).json({ message: "no deleting item id is provided in body" })
        const result = await products_collection.deleteOne({ id: idToDelete })
        // return res.status(200).json("delete success");

        if (result.deletedCount === 0) return res.status(400).json({ message: "the perticular id does not exists in database" })
        return res.status(200).json({ success: true, message: "Delete success" });

    } catch (error) {
        // return res.status(500).json("server issue")
        res.status(500).json({ success: false, message: "Server issue" });
    }
}



export const delete_manufacturer_controller = async (req, res) => {
    try {


        let idToDelete = req.body?.item_id;

        if (!idToDelete) {
            return res.status(400).json({ message: "no deleting item id is provided in body" })
        }
        const result = await manufacturers.deleteOne({ id: idToDelete })
        if (result.deletedCount === 0) return res.status(400).json({
            success: false,
            message: "the provided id does not exists in database"
        })
        return res.status(200).json({ success: true, message: "deletion success" });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const add_product_controller = async (req, res) => {
    try {
        const product = req.body?.product;
        if (!product || typeof product !== "object" || Array.isArray(product)) return res.status(400).json({ message: "adding product type must be an object" })
        await products_collection.insertOne(product)
        return res.status(200).json({
            success: true,
            message: "insertion success"
        });

    } catch (error) {
        console.log("error in add_product_controller ", error.message)
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const get_deals_controller = async (req, res) => {
    try {
        const data = await deals_collection.find().toArray();
        return res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        console.log("error in get-deals controller", error)
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const add_deals_controller = async (req, res) => {
    try {
        const { deal } = req.body;
        if (!deal || typeof deal !== "object" || Array.isArray(deal)) return res.status(400).json({ message: "adding deal type must be an object" })

        await deals_collection.insertOne(deal)
        return res.status(200).json({
            success: true,
            message: "Insertion success"
        })
    } catch (error) {
        console.log("error in add-deals controller", error)
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const delete_deal_controller = async (req, res) => {
    try {
        const { id } = req.body;

        const result = await deals_collection.deleteOne({ id })

        if (result.deletedCount === 0) return res.status(400).json({
            success: false,
            message: "provided id does not exists in database"
        })

        return res.status(200).json({
            success: true,
            message: "deletion success"
        })
    } catch (error) {
        console.log("error in add-deals controller", error)
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// ! new api creat for add reports 


export const get_reports_controller = async (req, res) => {
    try {
        const data = await reports_collection.find().toArray();

        return res.status(200).json({
            success: true,
            data: data
        });

    } catch (error) {
        console.log("error in get_reports_controller:", error.message);

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const add_report = async (req, res) => {
    try {
        const report = req.body?.report; // 👈 same old structure

        // ❌ validation
        if (!report || typeof report !== "object" || Array.isArray(report)) {
            return res.status(400).json({
                success: false,
                message: "report must be an object"
            });
        }

        // ❌ reportId required
        if (!report.reportId) {
            return res.status(400).json({
                success: false,
                message: "reportId is required"
            });
        }

        // ❌ unique reportId check
        const existing = await reports_collection.findOne({
            reportId: report.reportId
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Report ID already exists"
            });
        }

        // ✅ insert
        await reports_collection.insertOne(report);

        return res.status(200).json({
            success: true,
            message: "Report inserted successfully"
        });

    } catch (error) {
        console.log("error in add_report:", error.message);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




export const delete_report_controller = async (req, res) => {
    try {
        const id = req.params?.id;

        // 🔍 validation
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Report id is required"
            });
        }

        // ⚠️ MongoDB ObjectId convert karna padega
        const { ObjectId } = await import("mongodb");

        const result = await reports_collection.deleteOne({
            _id: new ObjectId(id)
        });

        // ❌ agar delete nahi hua
        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Report not found"
            });
        }

        // ✅ success
        return res.status(200).json({
            success: true,
            message: "Report deleted successfully"
        });

    } catch (error) {
        console.log("error in delete_report_controller:", error.message);

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
export const update_report = async (req, res) => {
    try {
        const { edits } = req.body;

        const updated_edits = {};
        if (!edits?.reportId) return res.status(400).json({ success: false, message: "you must include key reportId in edits object" })
        
        if (edits.status) updated_edits.status = edits.status
        if (edits.priority) updated_edits.priority = edits.priority
        if (edits.assing_to) updated_edits.assing_to = edits.assing_to
        if (edits.internal_notes) updated_edits.internal_notes = edits.internal_notes
        if(Object.keys(updated_edits).length <=1) return res.status(400).json({
            success:false,
            message:"atleast one update is required"
        })

        const result = await reports_collection.findOneAndUpdate(
            { reportId: edits.reportId },
            {
                $set: updated_edits
            },
            { new: true }

        );
        return res.status(200).json({
            success: true,
            updateReport: result
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}